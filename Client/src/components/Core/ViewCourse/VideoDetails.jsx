// src/components/VideoDetails.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import { updateCompletedLectures } from "../../../redux/slices/viewCourseSlice";

import {
  BiSkipNextCircle,
  BiSkipPreviousCircle,
  BiChevronLeft,
} from "react-icons/bi";
import { MdOutlineReplayCircleFilled } from "react-icons/md";
import { markLectureAsComplete } from "../../../services/operations/courseapis";

/* ─────────────────────────── Skeleton helper ─────────────────────────── */
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-700/50 rounded-md ${className}`} />
);

export default function VideoDetails() {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  /* ─── plain useRef (no TS type) ─── */
  const playerRef = useRef(null);

  /* Redux slices */
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, completedLectures } = useSelector(
    (state) => state.viewCourse
  );

  /* Local state */
  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [markLoading, setMarkLoading] = useState(false);

  /* ─────────────────── Load current subsection ─────────────────── */
  useEffect(() => {
    if (!courseSectionData.length) return;

    const section = courseSectionData.find((sec) => sec._id === sectionId);
    const subsection = section?.subSection.find(
      (sub) => sub._id === subSectionId
    );

    if (!section || !subsection) {
      navigate("/dashboard/enrolled-courses");
      return;
    }

    setVideoData(subsection);
    setVideoEnded(false);
  }, [courseSectionData, location.pathname, sectionId, subSectionId, navigate]);

  /* ───────── indices, first/last helpers ───────── */
  const indices = useCallback(() => {
    const sIdx = courseSectionData.findIndex((sec) => sec._id === sectionId);
    const ssIdx =
      sIdx >= 0
        ? courseSectionData[sIdx].subSection.findIndex(
            (sub) => sub._id === subSectionId
          )
        : -1;
    return { sIdx, ssIdx };
  }, [courseSectionData, sectionId, subSectionId]);

  const isFirstVideo = () => {
    const { sIdx, ssIdx } = indices();
    return sIdx === 0 && ssIdx === 0;
  };

  const isLastVideo = () => {
    const { sIdx, ssIdx } = indices();
    if (sIdx === -1 || ssIdx === -1) return false;
    return (
      sIdx === courseSectionData.length - 1 &&
      ssIdx === courseSectionData[sIdx].subSection.length - 1
    );
  };

  /* ───────── Navigation ───────── */
  const goToPrevVideo = () => {
    const { sIdx, ssIdx } = indices();
    if (sIdx === -1) return;

    if (ssIdx > 0) {
      const prevSubId = courseSectionData[sIdx].subSection[ssIdx - 1]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubId}`
      );
    } else if (sIdx > 0) {
      const prevSecId = courseSectionData[sIdx - 1]._id;
      const prevSubs = courseSectionData[sIdx - 1].subSection;
      const prevSubId = prevSubs[prevSubs.length - 1]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSecId}/sub-section/${prevSubId}`
      );
    }
  };

  const goToNextVideo = () => {
    const { sIdx, ssIdx } = indices();
    if (sIdx === -1) return;

    const subs = courseSectionData[sIdx].subSection;
    if (ssIdx < subs.length - 1) {
      const nextSubId = subs[ssIdx + 1]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubId}`
      );
    } else if (sIdx < courseSectionData.length - 1) {
      const nextSecId = courseSectionData[sIdx + 1]._id;
      const nextSubId = courseSectionData[sIdx + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSecId}/sub-section/${nextSubId}`
      );
    }
  };

  /* ───────── Mark complete ───────── */
  const handleLectureCompletion = async () => {
    setMarkLoading(true);
    const res = await markLectureAsComplete({
      courseId,
      subSectionId: subSectionId,
    });
    if (res) dispatch(updateCompletedLectures(subSectionId));
    setMarkLoading(false);
  };

  const handleReplay = () => {
  const player = playerRef.current;
  if (!player) return;

  // Prefer Vidstack’s remote if it’s ready…
  if (player.remote) {
    player.remote.seek(0);
    player.remote.play();
  } else {
    // …otherwise fall back to the native media element properties
    player.currentTime = 0;
    player.play?.();
  }
  setVideoEnded(false);
};

  /* ───────── UI ───────── */
  return (
    <section className="mx-auto w-full max-w-screen-2xl px-4 py-4 md:py-6">
      {/* Back (mobile) */}
      <button
        onClick={() => navigate(-1)}
        className="mb-3 flex items-center gap-1 text-sm font-medium text-gray-300 md:hidden"
      >
        <BiChevronLeft size={18} /> Back
      </button>

      {/* Player or skeleton */}
      {!videoData ? (
        <Skeleton className="w-full aspect-video" />
      ) : (
        <div className="relative overflow-hidden rounded-lg bg-gray-800">
          <MediaPlayer
            ref={playerRef}
            src={videoData.videoUrl}
            title={videoData.title}
            className="w-full aspect-video"
            playsInline
            preload="auto"
            onEnded={() => setVideoEnded(true)}
            playbackrates={[0.25, 0.5, 1, 1.5, 2]}
          >
            <MediaProvider />
            <DefaultVideoLayout icons={defaultLayoutIcons} />
          </MediaPlayer>

          {/* Overlay on finish */}
          {videoEnded && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-gray-900/60 backdrop-blur-sm">
              {!completedLectures.includes(videoData._id) && (
                <button
                  onClick={handleLectureCompletion}
                  disabled={markLoading}
                  className="rounded-md bg-yellow-200 px-6 py-2 text-sm font-semibold text-gray-900 transition hover:scale-[0.97] active:scale-95 sm:text-base"
                >
                  {markLoading ? "Saving…" : "Mark as Completed"}
                </button>
              )}

              <div className="flex w-full max-w-xs items-center justify-between px-6 sm:max-w-none sm:gap-8">
                {!isFirstVideo() && (
                  <BiSkipPreviousCircle
                    onClick={goToPrevVideo}
                    className="cursor-pointer rounded-full bg-gray-700 p-1 text-4xl transition hover:scale-95 sm:text-5xl"
                  />
                )}

                <MdOutlineReplayCircleFilled
                  onClick={handleReplay}
                  className="cursor-pointer rounded-full bg-gray-700 p-1 text-4xl transition hover:scale-95 sm:text-5xl"
                />

                {!isLastVideo() && (
                  <BiSkipNextCircle
                    onClick={goToNextVideo}
                    className="cursor-pointer rounded-full bg-gray-700 p-1 text-4xl transition hover:scale-95 sm:text-5xl"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Meta */}
      {videoData && (
        <article className="mx-auto mt-4 flex flex-col gap-2 px-1 text-left md:text-center">
          <h1 className="text-lg font-semibold text-gray-100 sm:text-2xl">
            {videoData.subSectionName}
          </h1>
          <p className="text-sm text-gray-400 md:text-base text-left">
            {videoData.description}
          </p>
        </article>
      )}
    </section>
  );
}
