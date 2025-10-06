import "./RowSection.css";
import VideoCard from "../VideoCard";

export default function RowSection({ videos }) {
  return (
    <section className="section">
      <div className="container">
        <div className="row4">
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </div>
    </section>
  );
}
