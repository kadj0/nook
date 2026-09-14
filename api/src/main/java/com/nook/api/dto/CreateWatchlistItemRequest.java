package com.nook.api.dto;

public class CreateWatchlistItemRequest {

    private Long listingId;
    private String userReference = "demo-user";

    public Long getListingId() {
        return listingId;
    }

    public void setListingId(Long listingId) {
        this.listingId = listingId;
    }

    public String getUserReference() {
        return userReference;
    }

    public void setUserReference(String userReference) {
        this.userReference = userReference;
    }
}
