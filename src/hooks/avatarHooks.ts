const UploadAvatar = async (
  event: ChangeEvent<HTMLInputElement>
): Promise<void> => {
  try {
    setUploading(true)

    if (!event.target.files || event.target.files.length == 0) {
      throw 'You must select an image to upload.'
    }
    const session = await getSession()
    const user = session?.user_id
    const file = event.target.files[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${session?.user_id}${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    let { error: uploadError } = await supabase.storage
      .from(DEFAULT_AVATARS_BUCKET)
      .upload(filePath, file)

    if (uploadError) {
      throw uploadError
    }

    setAvatarUrl(filePath)
  } catch (error) {
    console.log("this isn't working", error)
  } finally {
    setUploading(false)
  }
}
export default UploadAvatar
