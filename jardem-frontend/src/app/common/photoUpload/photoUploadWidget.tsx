import { Button, Grid, Header } from 'semantic-ui-react'
import PhotoDropzoneWidget from './photoDropzoneWidget'
import { useEffect, useState } from 'react'
import PhotoCropperWidget from './photoCropperWidget'
import { observer } from 'mobx-react-lite'

interface Props {
  loading: boolean
  uploadPhoto: (file: Blob) => void
}

export default observer(function PhotoUploadWidget({ loading, uploadPhoto }: Props) {
  const [files, setFiles] = useState<any>([])
  const [cropper, setCropper] = useState<Cropper>()

  function onCrop() {
    cropper?.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!))
  }

  useEffect(() => {
    return () =>
      files.forEach(
        (file: any) => {
          URL.revokeObjectURL(file.preview)
        },
        [files]
      )
  })

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header sub content='Step 1 - Add Photo' />
        <PhotoDropzoneWidget setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub content='Step 2 - Resize Image' />
        {files && files.length > 0 && (
          <PhotoCropperWidget setCropper={setCropper} imagePreview={files[0].preview} />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub content='Step 3 - Preview and Upload' />
        <>
          <div className='img-preview' style={{ minHeight: 200, overflow: 'hidden' }} />
          {files && files.length > 0 && (
            <Button.Group widths={2}>
              <Button icon='close' onClick={() => setFiles([])} disabled={loading} />
              <Button icon='check' positive onClick={onCrop} loading={loading} />
            </Button.Group>
          )}
        </>
      </Grid.Column>
    </Grid>
  )
})
