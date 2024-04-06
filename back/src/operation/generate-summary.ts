import axios from "axios";

// Función para generar texto utilizando la API de OpenAI GPT-3
export const generateSummary = async (prompt: string): Promise<string> => {
  try {
    // Realizar una solicitud POST a la API de OpenAI
    const respuesta = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 100, // Máximo número de tokens de texto a generar
        temperature: 0.7, // Temperatura de muestreo para el texto generado (mayor temperatura = más creatividad pero menos coherencia)
        stop: "\n", // Detener la generación de texto cuando se alcanza un salto de línea
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_DEV}`,
        },
      }
    );
    return respuesta.data.choices[0].message.content;
  } catch (error: any) {
    console.error("Error al generar texto:", error);
    return "Error al generar texto";
  }
};
