
import { templatesService } from "../templates/template.service";
import { ExtractedAnswer } from "./extracted-answers.entity";
import stringSimilarity from 'string-similarity';

export const extractedAnswersService = {
  createExtractedAnswers: async (
    ocrResultsByRegion: { region: any; ocrData: any }[],
    ocrResult: any
  ) => {
    const answers: ExtractedAnswer[] = [];

    for (const { region, ocrData } of ocrResultsByRegion) {
      let detectedAnswer: string | null = null;
      let detectedText: string | null = null;
      let score = 0;

      const rawText =
        ocrData.text?.replace(/\n+/g, " ").replace(/\s+/g, " ").trim() || "";

      console.log("--- Processing Region ---");
      console.log("Region ID:", region.regionId);
      console.log("Region Type:", region.type);
      console.log("Raw OCR Text:", JSON.stringify(rawText));

      if (region.type === "multiple_choice") {
        console.log("Options:", region.options);
        console.log("Is Marked (checkbox detection):", ocrData.isMarked);
      }

      console.log("Expected Correct Answer:", region.correctAnswer);

      if (region.type === "multiple_choice") {
        detectedAnswer = templatesService.detectMarkedOption(rawText, region.options || []);
        console.log("Detected Answer from OCR:", detectedAnswer);

        if (!detectedAnswer && ocrData.isMarked) {
          detectedAnswer = region.optionLabel || null;
          console.log("Detected Answer from checkbox fallback (optionLabel):", detectedAnswer);
        }
      
        if (detectedAnswer && region.correctAnswer) {
          score = detectedAnswer.toUpperCase() === region.correctAnswer.toUpperCase() ? 100 : 0;
        }
      
      } else {
        detectedText = rawText;
        console.log("Detected Text:", detectedText);

        if (detectedText && region.correctAnswer) {
          const correctText = region.correctAnswer.trim().toLowerCase();
          const givenText = detectedText.trim().toLowerCase();

          if (correctText.includes(givenText) || givenText.includes(correctText)) {
            score = 100;
          } else {
            const similarity = stringSimilarity.compareTwoStrings(correctText, givenText);
            if (similarity > 0.7) {
              score = 70;  
            }
          }
        }
      }

      console.log("Score:", score);
      console.log("-------------------------");

      const answer = new ExtractedAnswer();
      answer.questionId = region.regionId;
      answer.type = region.type;
      answer.detectedAnswer = detectedAnswer ?? "";
      answer.detectedText = detectedText ?? "";
      answer.score = score;
      answer.boundingBox = region.coordinates;
      answer.ocrResult = ocrResult;

      answers.push(answer);
    }

    await ExtractedAnswer.save(answers);
    return answers;
  },
};
