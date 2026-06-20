import { FaRegBookmark } from "react-icons/fa";
import "./EmptyState.css";

const EmptyState = ({
    message = "No content available.",
    icon: Icon = FaRegBookmark,
    hint = "Save videos from the feed and they'll show up here.",
}) => {
    return (
        <div className="empty-state">
            <div className="empty-state__icon" aria-hidden="true">
                <Icon />
            </div>
            <h2 className="empty-state__title">{message}</h2>
            {hint && <p className="empty-state__hint">{hint}</p>}
        </div>
    );
};

export default EmptyState;
