from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.core.data_access.file_repository import FileRepository
from backend.core.use_cases.calculate_metrics_interactor import CalculateMetricsInteractor
from backend.core.use_cases.convert_file_interactor import ConvertFileInteractor

@api_view(['POST'])
def upload_file(request):
    if 'file' not in request.FILES:
        return Response({'status': 'error', 'message': 'No file provided or invalid request'})
    
    uploaded_file = request.FILES['file']
    file_repo = FileRepository()
    calculate_metrics = CalculateMetricsInteractor()
    convert_file = ConvertFileInteractor()

    try:
        file_name, file_path = file_repo.save_file(uploaded_file)
        protected_attributes = ['sender_gender', 'sender_race']
        true_df, pred_df = convert_file.convert(file_path, protected_attributes)
        results = calculate_metrics.calculate(true_df, pred_df, protected_attributes)

        return Response({
            "file_name": file_name,
            "file_path": file_path,
            "overview": {
                "score": results["bias_score"],
                "top_category": "ABC",
            },
            "metric_results": results["formatted_metrics"],
        })

    except Exception as e:
        return Response({'status': 'error', 'message': str(e)})
    