import { ExtractedAnswer } from "../../extracted_answers/extracted-answers.entity";
import { extractedAnswersService } from "../../extracted_answers/extracted-answers.service";


import * as extractedAnswersEntity from '../../extracted_answers/extracted-answers.entity';

jest.spyOn(extractedAnswersEntity.ExtractedAnswer, 'save').mockImplementation(jest.fn());


describe('extractedAnswersService.createExtractedAnswers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly create multiple choice extracted answers', async () => {
    const ocrResultsByRegion = [
      {
        region: {
          regionId: 'q1',
          type: 'multiple_choice',
          options: ['A', 'B', 'C'],
          correctAnswer: 'B',
          optionLabel: 'B',
          coordinates: [0, 0, 10, 10],
        },
        ocrData: {
          text: ' B ',
          isMarked: true,
        },
      },
    ];

    const ocrResultMock = { id: 'ocr1' };

    const answers = await extractedAnswersService.createExtractedAnswers(ocrResultsByRegion, ocrResultMock);

    expect(answers).toHaveLength(1);
    expect(answers[0].detectedAnswer).toBe('B');
    expect(answers[0].score).toBe(100);
    expect(ExtractedAnswer.save).toHaveBeenCalled();
  });

  it('should handle text type region and score similarity', async () => {
    const ocrResultsByRegion = [
      {
        region: {
          regionId: 'q2',
          type: 'text',
          correctAnswer: 'Hello World',
          coordinates: [0, 0, 10, 10],
        },
        ocrData: {
          text: 'hello worl',
        },
      },
    ];

    const ocrResultMock = { id: 'ocr2' };

    const answers = await extractedAnswersService.createExtractedAnswers(ocrResultsByRegion, ocrResultMock);

    expect(answers).toHaveLength(1);
    expect(answers[0].detectedText.toLowerCase()).toBe('hello worl');
    expect(answers[0].score).toBeGreaterThanOrEqual(70);
    expect(ExtractedAnswer.save).toHaveBeenCalled();
  });
});
