import axios from "./axios-request-service";

export class SummaryGenerator {
  public static async getSummary(videoUrl: string): Promise<string> {
    try {
      console.log("entra");
      const response = (await axios.post("/generate", {
        videoUrl,
      })) as unknown as string;
      return response;
    } catch (error) {
      console.error("Error al generar el resumen:", error);
      throw error;
    }
  }
}
