export interface CaseStudyFact { label: string; value: string; description: string; }
// Fact cards reproduced from the published case-study reference.
export const caseStudyFacts: Record<string, CaseStudyFact[]> = {
  twiller: [
    { label: 'Feed modes', value: '4', description: 'For You, Following, Topics, and Circles' },
    { label: 'Feed rules', value: '6', description: 'Filtering and ranking with expiry controls' },
    { label: 'Paid access', value: '30 Days', description: 'Verified Razorpay purchases with posting quotas' },
    { label: 'Authentication', value: 'Firebase', description: 'ID token verification and backend session checks' },
  ],
  attn: [
    { label: 'Privacy standard', value: '100%', description: 'On-device client inference, 0 server calls' },
    { label: 'Vision model', value: '468 Pts', description: 'MediaPipe Face Mesh dedicated web worker' },
    { label: 'Rule engine', value: '4 Rules', description: 'Configurable triggers, dwell times & cooldowns' },
    { label: 'Data retention', value: 'Local 30', description: 'Browser-local reports with CSV/JSON exports' },
  ],
  brahmi: [
    { label: 'Recognition accuracy', value: '94%', description: 'Reported character classification accuracy' },
    { label: 'Modern scripts', value: '3 Scripts', description: 'Transliteration to Telugu, Tamil, Devanagari' },
    { label: 'Vision pipeline', value: 'OpenCV', description: 'Adaptive thresholding & contour segmentation' },
    { label: 'Model backbone', value: 'CNN', description: 'Deep learning classifier with TensorFlow/Keras' },
  ],
};
