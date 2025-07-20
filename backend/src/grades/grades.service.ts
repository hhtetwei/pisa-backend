
import { ExtractedAnswer } from '../extracted_answers/extracted-answers.entity';
import { TemplateRegion } from '../template_regions/template-regions.entity';

export const gradingService = {
  calculateScore: (
    extractedAnswers: ExtractedAnswer[],
    templateRegions: TemplateRegion[],
  ): { score: number; total: number } => {
    let correctCount = 0;

    for (const answer of extractedAnswers) {
      const region = templateRegions.find(r => r.regionId === answer.questionId);
      if (!region) continue;

      if (region.type === 'multiple_choice') {
        if (answer.detectedAnswer?.toUpperCase() === region.correctAnswer?.toUpperCase()) {
          correctCount++;
        }
      }
    }

    const total = templateRegions.filter(r => r.type === 'multiple_choice').length;
    return { score: correctCount, total };
  },
};
