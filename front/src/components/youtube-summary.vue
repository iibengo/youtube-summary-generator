<template>
  <div class="container">
    <h2 class="title">YouTube Summary generator</h2>
    <h3 class="subtitle">By @ii.bengo</h3>
    <div class="input-wrapper">
      <input
        type="text"
        v-model="inputText"
        placeholder="Youtube Url"
        class="input-text"
      />
      <button @click="handleButtonClick" class="button">Get Summary</button>
    </div>
    <textarea
      v-model="outputText"
      rows="4"
      placeholder="Result"
      class="textarea"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { SummaryGenerator } from "@/service/summary-generator";

export default class YoutubeSummary extends Vue {
  inputText: string = "";
  outputText: string = "";

  async handleButtonClick() {
    const resume = await SummaryGenerator.getSummary(this.inputText);
    console.log("resume", resume);
    this.outputText = resume;
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  max-width: 50%;
}

.title,
.subtitle {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #42b983; /* Color de la fuente */
  text-transform: uppercase; /* Convertir texto a mayúsculas */
  text-align: center; /* Alinear el texto al centro */
  font-family: "Roboto", sans-serif; /* Fuente futurista */
}
.subtitle {
  font-size: 20px;
  color: #2c302e;
}
.input-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
}

.input-text {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 15px;
}

.button:hover {
  background-color: #3d9a76;
}

.textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  height: 400px;
}
</style>
