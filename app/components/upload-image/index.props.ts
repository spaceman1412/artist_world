export interface UploadImageProps {
    /**
     * Get image on upload. Allow parent to do whatever they want with value
     */
    onUpload?: (value: string) => void
}
