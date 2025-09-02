const BackgroundVideo = () => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed top-0 left-0 w-full h-full object-cover z-10 opacity-15"
    >
      <source src="https://cdn.vstecs.com.ph/static/videos/y2k_noaudio.mp4" type="video/mp4" />
    </video>
  )
}

export default BackgroundVideo
