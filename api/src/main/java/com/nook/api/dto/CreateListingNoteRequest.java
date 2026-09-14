package com.nook.api.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreateListingNoteRequest {

    @NotNull(message = "The Listing id is required!")
    private Long listingId;

    private String userReference = "demo-user";

    @NotBlank(message = "The notes section cannot be empty!")
    @Size(max = 1000, message = " Note must be less than 1000 characters!")
    private String note;

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

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
