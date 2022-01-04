const asyncHandler = async promise => {
  try {
    return await promise
  } catch (err) {
    return err
  }
}

export default asyncHandler
