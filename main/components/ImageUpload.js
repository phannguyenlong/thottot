import React from 'react'

// meterial-ui components
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
// meterial-ui icons
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
// react-image-crop
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
// images
import noimg from '../static/images/noimg-square.svg'
// styling
import sass from '../styles/sass/ImageUpload.scss'

const reactCropImgStyle = {
  width: '100%'
}

class ImageUpload extends React.Component {
  constructor(props) {
    super(props)
    let { initBLOB, initURL, aspect } = this.props

    this.imgInput = React.createRef()
    this.state = {
      captionError: '',
      imgURL: '',
      cropURL: initURL,
      cropBLOB: initBLOB,
      isOpen: false,
      crop: {
        aspect: aspect ? aspect : 1,
        height: 50,
        x: 0,
        y: 0
      },
      pixelCrop: null
    }
  }

  getCropBLOB = (img, pixelCrop) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    ctx.drawImage(
      img,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    )

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        resolve(blob)
      }, 'image/jpeg')
    })
  }

  urlFromBLOB = blob => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.onloadend = () => {
        resolve(reader.result)
      }
      reader.readAsDataURL(blob)
    })
  }

  validate = () => {
    const { hasCaption, caption } = this.props
    let { captionError } = this.state
    let longDesc = false
    if (hasCaption) {
      if (caption.length > 50) {
        captionError = 'Nhiều nhất 50 ký tự'
        longDesc = true
      } else captionError = ''
    }

    this.setState({ captionError })
    return !longDesc
  }

  onAcceptCrop = async () => {
    let { isOpen, imgURL, pixelCrop, cropBLOB, cropURL } = this.state

    if (imgURL && imgURL !== '') {
      const img = new Image()
      img.src = imgURL

      if (this.validate()) {
        cropBLOB = await this.getCropBLOB(img, pixelCrop)
        cropURL = await this.urlFromBLOB(cropBLOB)
        if (this.props.setBLOB) {
          this.props.setBLOB(cropBLOB)
        }
        isOpen = !isOpen
      }
    } else isOpen = !isOpen

    this.setState({
      isOpen,
      cropBLOB,
      cropURL
    })
  }

  onOpenDialog = () => {
    this.setState({
      isOpen: true
    })
  }

  onCloseDialog = () => {
    this.setState({
      isOpen: false
    })
  }

  onChangeCrop = (crop, pixelCrop) => {
    this.setState({ crop, pixelCrop })
  }

  onSelectImage = e => {
    e.preventDefault()
    this.imgInput.current.click()
  }

  onChangeImageCaption = e => {
    e.preventDefault()
    if (this.props.setCaption) {
      this.props.setCaption(e.target.value)
    }
  }

  onChangeImage = e => {
    e.preventDefault()
    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        imgURL: reader.result
      })
    }

    if (file) reader.readAsDataURL(file)
  }

  render() {
    const { captionError, imgURL, cropURL, crop, isOpen } = this.state
    const { caption, hasCaption, clickRef } = this.props

    let cropPreview = null
    if (cropURL) {
      cropPreview = (
        <img className={sass.cropPreview} src={cropURL} alt="cropped image" />
      )
    } else {
      cropPreview = (
        <img className={sass.cropPreview} src={noimg} alt="cropped image" />
      )
    }

    let imgPreview = null
    if (imgURL) {
      imgPreview = (
        <ReactCrop
          className={sass.imgPreview}
          src={imgURL}
          onChange={this.onChangeCrop}
          crop={crop}
          imageStyle={reactCropImgStyle}
        />
      )
    } else {
      imgPreview = (
        <img className={sass.imgPreview} src={noimg} alt="cropped image" />
      )
    }

    let imgCaption = null
    if (hasCaption) {
      imgCaption = (
        <TextField
          multiline
          error={captionError !== ''}
          helperText={captionError}
          rows={3}
          className={sass.imgCaption}
          label="Mô tả"
          value={caption}
          variant="outlined"
          onChange={this.onChangeImageCaption}
          maxLength={50}
        />
      )
    }

    return (
      <div className={this.props.className}>
        <input
          ref={this.imgInput}
          className={sass.imgInput}
          type="file"
          onChange={this.onChangeImage}
          accept="image/jpeg"
        />
        <a
          href="#"
          ref={clickRef ? clickRef : null}
          onClick={this.onOpenDialog}
        >
          {cropPreview}
        </a>
        <Dialog
          className={sass.cropDialog}
          classes={{
            paper: sass.cropDialogPaper
          }}
          open={isOpen}
          onClose={this.onCloseDialog}
          aria-localledby="cropDialogTitle"
        >
          <DialogTitle
            id="cropDialogTitle"
            disableTypography
            className={sass.cropDialogTitle}
          >
            <Typography variant="h6">Tải lên hình ảnh</Typography>
            <div className={sass.grow} />
            <IconButton
              className={sass.cropDialogCloseIcon}
              onClick={this.onCloseDialog}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Grid
              container
              direction="column"
              spacing={16}
              justify="center"
              alignItems="center"
            >
              <Grid item>{imgPreview}</Grid>
              <Grid item xs={12} style={{ width: '100%' }}>
                {imgCaption}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onSelectImage}>Chọn ảnh</Button>
            <Button onClick={this.onAcceptCrop}>Đồng ý</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default ImageUpload
