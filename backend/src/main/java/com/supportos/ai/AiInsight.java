package com.supportos.ai;

import java.util.List;

public class AiInsight {
    private String category;
    private String intent;
    private String sentiment;
    private int urgencyScore; // 0 - 100
    private int confidence; // 0 - 100
    private String priority;
    private String suggestedReply;
    private List<String> policyReferences;
    private List<String> nextBestActions;
    private boolean requiresHumanApproval;

    public AiInsight() {}

    public AiInsight(String category, String intent, String sentiment, int urgencyScore,
                     int confidence, String priority, String suggestedReply,
                     List<String> policyReferences, List<String> nextBestActions,
                     boolean requiresHumanApproval) {
        this.category = category;
        this.intent = intent;
        this.sentiment = sentiment;
        this.urgencyScore = urgencyScore;
        this.confidence = confidence;
        this.priority = priority;
        this.suggestedReply = suggestedReply;
        this.policyReferences = policyReferences;
        this.nextBestActions = nextBestActions;
        this.requiresHumanApproval = requiresHumanApproval;
    }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getIntent() { return intent; }
    public void setIntent(String intent) { this.intent = intent; }

    public String getSentiment() { return sentiment; }
    public void setSentiment(String sentiment) { this.sentiment = sentiment; }

    public int getUrgencyScore() { return urgencyScore; }
    public void setUrgencyScore(int urgencyScore) { this.urgencyScore = urgencyScore; }

    public int getConfidence() { return confidence; }
    public void setConfidence(int confidence) { this.confidence = confidence; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getSuggestedReply() { return suggestedReply; }
    public void setSuggestedReply(String suggestedReply) { this.suggestedReply = suggestedReply; }

    public List<String> getPolicyReferences() { return policyReferences; }
    public void setPolicyReferences(List<String> policyReferences) { this.policyReferences = policyReferences; }

    public List<String> getNextBestActions() { return nextBestActions; }
    public void setNextBestActions(List<String> nextBestActions) { this.nextBestActions = nextBestActions; }

    public boolean isRequiresHumanApproval() { return requiresHumanApproval; }
    public void setRequiresHumanApproval(boolean requiresHumanApproval) { this.requiresHumanApproval = requiresHumanApproval; }
}
