"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradingService = void 0;
exports.gradingService = {
    calculateScore: (extractedAnswers, templateRegions) => {
        let correctCount = 0;
        for (const answer of extractedAnswers) {
            const region = templateRegions.find(r => r.regionId === answer.questionId);
            if (!region)
                continue;
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
