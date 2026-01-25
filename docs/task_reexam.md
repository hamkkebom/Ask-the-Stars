# Re-examination of Video Architecture

- [ ] **Data Source Analysis**
    - [ ] List R2 files to identify thumbnail naming convention.
    - [ ] Verify `VideosService` logic for handling R2 keys vs URLs.
- [ ] **Fix Sync Logic**
    - [ ] Update `syncWithStorage` to find thumbnail images in R2.
    - [ ] Match thumbnails to videos (by filename).
    - [ ] Update `VideoTechnicalSpec` with thumbnail R2 key/URL.
- [ ] **Frontend Update**
    - [ ] Ensure `AdvancedVideoGrid` uses the passed `videoUrl` and `thumbnailUrl` correctly.
    - [ ] Validate `CompactVideoCard` displays the R2 thumbnail if available.
- [ ] **Verification**
    - [ ] Run sync again.
    - [ ] Verify frontend displays correct thumbnails (not placeholders).
