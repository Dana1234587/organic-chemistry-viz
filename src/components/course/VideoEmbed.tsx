'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Hls from 'hls.js';

interface VideoEmbedProps {
    type: 'bunny' | 'youtube' | 'mp4' | 'hls';
    url: string;
    title?: string;
    thumbnail?: string;
}

export default function VideoEmbed({ type, url, title, thumbnail }: VideoEmbedProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);

    const [showFallback, setShowFallback] = useState(false);

    // Timeout safety net: if loading takes > 8 seconds, show fallback
    useEffect(() => {
        const timer = setTimeout(() => {
            if (isLoading) setShowFallback(true);
        }, 8000); // 8 seconds timeout
        return () => clearTimeout(timer);
    }, [isLoading]);

    // Handle HLS video for Bunny Stream or direct HLS
    useEffect(() => {
        if ((type !== 'bunny' && type !== 'hls') || !url || !videoRef.current) return;

        const video = videoRef.current;

        if (Hls.isSupported()) {
            // Browser needs HLS.js
            const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
                xhrSetup: function (xhr, url) {
                    xhr.withCredentials = false; // Important for CORS on some CDNs
                }
            });

            hlsRef.current = hls;
            hls.loadSource(url);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                setIsLoading(false);
                setShowFallback(false);
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                console.warn('HLS error:', data);
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.error("fatal network error encountered, try to recover");
                            hls.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.error("fatal media error encountered, try to recover");
                            hls.recoverMediaError();
                            break;
                        default:
                            console.error("cannot recover");
                            hls.destroy();
                            setHasError(true);
                            setIsLoading(false);
                            break;
                    }
                }
            });

            return () => {
                hls.destroy();
                hlsRef.current = null;
            };
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Safari has native HLS support
            video.src = url;
            video.addEventListener('loadedmetadata', () => setIsLoading(false));
            video.addEventListener('error', (e) => {
                console.error("Native video error", e);
                setHasError(true);
                setIsLoading(false);
            });
        } else {
            console.error("HLS not supported");
            setHasError(true);
            setIsLoading(false);
        }
    }, [type, url]);

    // Generate embed URL for YouTube
    const getYouTubeEmbedUrl = () => {
        const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    };

    if (!url) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    background: 'linear-gradient(135deg, var(--neutral-900) 0%, var(--neutral-850) 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    border: '2px dashed var(--neutral-700)'
                }}
            >
                <div style={{ fontSize: '3rem' }}>🎬</div>
                <p style={{ color: 'var(--neutral-400)', fontSize: '1rem' }}>
                    Video coming soon...
                </p>
            </motion.div>
        );
    }

    // Bunny HLS Video Player (also handles direct HLS)
    if (type === 'bunny' || type === 'hls') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/9',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: 'var(--neutral-900)'
                }}
            >

                {/* Timeout Fallback */}
                {showFallback && !hasError && (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 20,
                        backgroundColor: 'rgba(20,20,20,0.9)',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '1px solid var(--neutral-700)',
                        maxWidth: '90%',
                        textAlign: 'center'
                    }}>
                        <span style={{ color: 'var(--neutral-300)', marginBottom: '1rem', fontSize: '0.95rem' }}>
                            Video is taking longer than usual...
                        </span>
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                padding: '0.6rem 1.2rem',
                                background: 'var(--primary-600)',
                                color: 'white',
                                borderRadius: '8px',
                                fontSize: '0.95rem',
                                textDecoration: 'none',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <span>📺</span> Watch Directly
                        </a>
                    </div>
                )}

                {/* Error state */}
                {hasError && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'var(--neutral-900)',
                        gap: '1rem',
                        zIndex: 10,
                        aspectRatio: '16/9',
                        padding: '1rem',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '3rem' }}>⚠️</div>
                        <span style={{ color: 'var(--neutral-400)', fontWeight: 600 }}>Unable to load video</span>
                        <span style={{ color: 'var(--neutral-500)', fontSize: '0.8rem' }}>
                            The video stream could not be initialized.
                        </span>
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                marginTop: '0.5rem',
                                padding: '0.5rem 1rem',
                                background: 'var(--primary-600)',
                                color: 'white',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <span>📺</span> Watch Directly
                        </a>
                    </div>
                )}

                {/* HLS Video Player - Always visible, native loader will handle buffering */}
                <video
                    ref={videoRef}
                    controls
                    playsInline
                    poster={thumbnail}
                    style={{
                        width: '100%',
                        display: hasError ? 'none' : 'block',
                        aspectRatio: '16/9',
                        background: '#000'
                    }}
                />
            </motion.div>
        );
    }

    // MP4 Video Player
    if (type === 'mp4') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    position: 'relative',
                    width: '100%',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: 'var(--neutral-900)'
                }}
            >
                <video
                    controls
                    style={{ width: '100%', display: 'block' }}
                    poster={thumbnail}
                >
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </motion.div>
        );
    }

    // YouTube/Other iframe embed
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'var(--neutral-900)'
            }}
        >
            {/* Loading overlay */}
            {isLoading && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--neutral-900)',
                    gap: '1rem',
                    zIndex: 1
                }}>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        style={{
                            width: '40px',
                            height: '40px',
                            border: '3px solid var(--neutral-700)',
                            borderTopColor: 'var(--primary-500)',
                            borderRadius: '50%'
                        }}
                    />
                    <span style={{ color: 'var(--neutral-400)' }}>Loading video...</span>
                </div>
            )}

            {/* Video iframe */}
            <iframe
                src={type === 'youtube' ? getYouTubeEmbedUrl() : url}
                title={title || 'Lesson Video'}
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none'
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                }}
            />
        </motion.div>
    );
}
