import { ScreenshotGallery } from "@/components/screenshot-gallery";
import type { Messages } from "@/lib/i18n/messages";
import homeImage from "../../public/images/setsuna-home.png";
import chatReviewImage from "../../public/images/chat-review.png";
import pullRequestsImage from "../../public/images/pull-requests.png";
import automationsImage from "../../public/images/automations.png";
import pluginsImage from "../../public/images/plugins.png";
import appBuilderImage from "../../public/images/app-builder.png";

const workspaces = [
  {
    id: "home",
    image: homeImage,
  },
  {
    id: "conversation",
    image: chatReviewImage,
  },
  {
    id: "review",
    image: pullRequestsImage,
  },
  {
    id: "automations",
    image: automationsImage,
  },
  {
    id: "plugins",
    image: pluginsImage,
  },
  {
    id: "appBuilder",
    image: appBuilderImage,
  },
] as const;

export function WorkspaceShowcase({
  messages,
}: {
  messages: Messages["workspace"];
}) {
  return (
    <section
      id="workspace"
      className="workspace-section section-block"
      aria-labelledby="workspace-title"
    >
      <div className="page-container">
        <div className="section-heading">
          <h2 id="workspace-title">{messages.title}</h2>
        </div>
        <ScreenshotGallery
          items={workspaces.map(({ id, image }) => ({
            image,
            ...messages.items[id],
          }))}
          messages={messages.preview}
        />
      </div>
    </section>
  );
}
