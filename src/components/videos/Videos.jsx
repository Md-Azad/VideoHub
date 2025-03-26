import { useGetVideosQuery } from "../../features/api/ApiSlice";
import Video from "./Video";
import VideoLoader from "../ui/loaders/VideoLoader.jsx";
import Error from "../ui/Error.jsx";

const Videos = () => {
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  let content = null;
  if (isLoading) {
    content = <VideoLoader />;
  }
  if (!isLoading && isError) {
    content = <Error />;
  }
  if (!isLoading && !isError && videos.length === 0) {
    content = <p>No Video found!</p>;
  }
  if (!isLoading && !isError && videos.length > 0) {
    content = videos.map((video) => <Video key={video.id} video={video} />);
  }

  return <>{content}</>;
};

export default Videos;
