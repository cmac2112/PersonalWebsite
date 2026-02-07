import React from 'react'
import Emphasis from '../../Emphasis/Emphasis'
const BrainRot = () => {
  return (
    <div>
      <h2><Emphasis>Automated video creation with voice over and synced captions</Emphasis></h2>
    <p>
      Brainrot Generator is an automated content creation tool that transforms Reddit threads into 
      engaging short-form videos. Built as a C# console application, <Emphasis>it streamlines the entire video 
      production pipeline—from content extraction to final render</Emphasis>. The program accepts a Reddit URL, 
      scrapes the top three comments, generates natural-sounding voiceovers using ElevenLabs' text-to-speech 
      API, transcribes audio into synchronized captions via OpenAI's Whisper, and composites everything 
      with stock background footage using FFmpeg. The result is a polished, platform-ready video that 
      captures the viral "brainrot" aesthetic popular on TikTok and YouTube Shorts.
    </p>
    <h2><Emphasis>Impact</Emphasis></h2>
    <p>
      The tool dramatically reduces content creation time while maintaining quality output. <Emphasis>Capable of 
      generating up to 30 videos in just a couple minutes, it removes the manual bottleneck of video editing, voice 
      recording, and caption synchronization</Emphasis>. Videos produced by the generator have collectively achieved 
      over <Emphasis>1,000 views across social media platforms with minimal promotion effort</Emphasis>, demonstrating the 
      effectiveness of automated content pipelines. This project proves that strategic automation can 
      compete with manually-created content in the short-form video space.
    </p>
     <h2><Emphasis>Problem-Solving Approach</Emphasis></h2>
    <p>
      The most significant technical challenge was parsing Reddit's JSON response structure to extract 
      meaningful content. Reddit's API returns deeply nested data with numerous automated posts, bot 
      comments, and metadata that needed filtering. I solved this by implementing targeted array traversal 
      to locate the first comment array, then extracting the top three ranked human-written comments while 
      discarding system-generated noise. Additionally, coordinating multiple API calls (Reddit → ElevenLabs → 
      Whisper) and managing the FFmpeg rendering pipeline required careful sequencing to achieve the 
      5-minute throughput for 30 videos. The solution prioritizes efficiency—no audio-video synchronization 
      is needed since the background footage runs independently, allowing for parallel processing of multiple 
      videos.
    </p>
    </div>
  )
}

export default BrainRot
