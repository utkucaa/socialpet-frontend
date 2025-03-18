import axios from './axios';

interface BreedDetectionResult {
  type: string;
  breed: string;
  confidence?: number;
}

/**
 * Analyzes a cat image using OpenAI Vision API
 * @param imageData Base64 image data or image URL
 * @returns Promise with cat breed detection result
 */
export const analyzeCatBreed = async (imageData: string): Promise<BreedDetectionResult> => {
  try {
    console.log('[BreedDetectionService] Starting cat breed analysis...');
    
    // For base64 data URLs, we need to convert to a file
    if (imageData.startsWith('data:image')) {
      console.log('[BreedDetectionService] Processing base64 image data...');
      
      // Create a FormData object
      const formData = new FormData();

      // Convert base64 to blob
      const response = await fetch(imageData);
      const blob = await response.blob();
      
      console.log(`[BreedDetectionService] Converted base64 to blob: ${blob.type}, size: ${blob.size} bytes`);
      
      // Create a File object from the blob
      const file = new File([blob], "cat_image.jpg", { type: blob.type });
      
      // Append the file to FormData
      formData.append('image', file);
      
      console.log('[BreedDetectionService] Sending request to API endpoint: http://localhost:8080/api/v1/breed-analyzer/analyze');
      
      // Make the API request
      const apiResponse = await axios.post('http://localhost:8080/api/v1/breed-analyzer/analyze', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      console.log('[BreedDetectionService] Received API response:', apiResponse.data);
      
      if (!apiResponse.data) {
        throw new Error('API response is empty');
      }
      
      const responseData = JSON.parse(apiResponse.data.result);
      const result = {
        type: 'Kedi',
        breed: responseData.breed || responseData.result || responseData.breedName || 'Tanımlanamadı',
        confidence: responseData.confidence || responseData.score || 0.75
      };
      
      console.log('[BreedDetectionService] Analysis result:', result);
      return result;
    }
    
    // If it's a file path or URL, the backend should handle it directly
    console.error('[BreedDetectionService] Direct file upload not implemented yet - use base64 format');
    return {
      type: 'Kedi',
      breed: 'Tanımlanamadı',
      confidence: 0
    };
  } catch (error: any) {
    console.error('[BreedDetectionService] Error analyzing cat breed:', error);
    
    // If it's an axios error, log more details
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('[BreedDetectionService] Error response:', {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('[BreedDetectionService] No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('[BreedDetectionService] Request error:', error.message);
    }
    
    return {
      type: 'Kedi',
      breed: 'Tanımlanamadı',
      confidence: 0
    };
  }
};
