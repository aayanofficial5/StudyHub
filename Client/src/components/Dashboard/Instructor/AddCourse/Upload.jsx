import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData || editData || ""
  );

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const accept = video ? "video/mp4" : "image/jpeg,image/png,image/jpg";

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue, name]);

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <label
          htmlFor={name}
          className="block mb-1 font-medium text-richblack-5"
        >
          {label} {!viewData && <span className="text-red-500">*</span>}
        </label>

        <div
          className={`${
            isDragActive ? "bg-gray-700" : "bg-gray-800"
          } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-gray-500`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {previewSource ? (
            <div className="flex w-full flex-col p-6">
              {!video ? (
                <img
                  src={previewSource}
                  alt="Preview"
                  className="h-full w-full rounded-md object-cover"
                />
              ) : (
                <MediaPlayer
                  title="Uploaded Video"
                  src={previewSource}
                  aspectRatio="16/9"
                  className="rounded-md"
                >
                  <MediaProvider />
                  <DefaultVideoLayout icons={defaultLayoutIcons} />
                </MediaPlayer>
              )}
              {!viewData && (
                <button
                  type="button"
                  onClick={() => {
                    setPreviewSource("");
                    setSelectedFile(null);
                    setValue(name, null);
                  }}
                  className="mt-3 text-blue-300 cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>
          ) : (
            <div className="flex w-full flex-col items-center p-6 text-center">
              <div className="grid aspect-square w-14 place-items-center rounded-full bg-gray-900">
                <FiUploadCloud className="text-3xl text-blue-500" />
              </div>
              <p className="mt-2 max-w-[200px] text-xs text-gray-400/90 uppercase tracking-wider">
                Drag and drop a {video ? "video" : "image"}, or click to{" "}
                <span className="font-semibold text-blue-400">browse</span> a
                file
              </p>
              <ul className="mt-10 flex list-disc justify-between space-x-12 text-xs text-gray-400/90 tracking-wider">
                <li>Aspect ratio 16:9</li>
                <li>Recommended size 1024x576</li>
              </ul>
            </div>
          )}
        </div>

        {errors[name] && (
          <p className="text-red-500 text-sm mt-1">{label} is required.</p>
        )}
      </div>
    </div>
  );
}
