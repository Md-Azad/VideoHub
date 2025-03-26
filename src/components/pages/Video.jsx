import { useParams } from "react-router-dom";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";
import { useGetVideoQuery } from "../../features/api/ApiSlice";
import VideoLoader from "../ui/loaders/VideoLoader";
import Error from "../ui/Error";

const Video = () => {
  const { videoId } = useParams();
  const { data: video, isLoading, isError } = useGetVideoQuery(videoId);

  if (isLoading) {
    return <VideoLoader />;
  }
  if (!isLoading && isError) {
    return <Error />;
  }
  if (!isLoading && !isError && !video.id) {
    return <p>No Video found!</p>;
  }
  return (
    <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
      <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <div className="col-span-full w-full space-y-8 lg:col-span-2">
            <Player link={video?.link} />
            <Description video={video} />
          </div>

          <RelatedVideos title={video?.title} />
        </div>
      </div>
    </section>
  );
};

export default Video;
