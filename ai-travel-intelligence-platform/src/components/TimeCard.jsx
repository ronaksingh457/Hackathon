import { Clock3 } from "lucide-react";
import { Skeleton } from "./LoadingState";

export default function TimeCard({ timeInfo }) {
  if (!timeInfo) {
    return (
      <div className="panel-card time-card">
        <h3>Local Time</h3>
        <Skeleton width="70%" height="34px" />
      </div>
    );
  }

  return (
    <div className="panel-card time-card">
      <h3><Clock3 size={16} /> Local Time</h3>
      <div className="time-display">{timeInfo.timeString}</div>
      <p className="time-date">{timeInfo.dateString}</p>
      <p className="time-zone">{timeInfo.timezone}</p>
    </div>
  );
}
