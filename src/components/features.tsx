import {
  Blocks,
  CloudUpload,
  FolderTree,
  GitPullRequest,
  Globe,
  MessagesSquare,
  Network,
  SlidersHorizontal,
  Terminal,
} from "lucide-react";
import type { Messages } from "@/lib/i18n/messages";

const features = [
  { id: "conversation", icon: MessagesSquare },
  { id: "files", icon: FolderTree },
  { id: "browser", icon: Globe },
  { id: "localTools", icon: Terminal },
  { id: "review", icon: GitPullRequest },
  { id: "models", icon: SlidersHorizontal },
  { id: "proxy", icon: Network },
  { id: "webdav", icon: CloudUpload },
  { id: "extensions", icon: Blocks },
] as const;

export function Features({ messages }: { messages: Messages["features"] }) {
  return (
    <section
      id="features"
      className="section-block page-container"
      aria-labelledby="features-title"
    >
      <div className="section-heading">
        <h2 id="features-title">{messages.title}</h2>
      </div>
      <div className="features-grid">
        {features.map(({ id, icon: Icon }) => (
          <article className="feature-card" key={id}>
            <div className="feature-top">
              <Icon size={25} strokeWidth={1.4} aria-hidden="true" />
            </div>
            <h3>{messages.items[id].title}</h3>
            <p>{messages.items[id].description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
