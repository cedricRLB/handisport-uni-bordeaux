import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sport et inclusion - ISG Bordeaux" },
      { name: "description", content: "Website for a handisport conference at ISG Bordeaux, featuring experts and para surf champion." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Sport et inclusion - ISG Bordeaux" },
      { property: "og:description", content: "Website for a handisport conference at ISG Bordeaux, featuring experts and para surf champion." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Sport et inclusion - ISG Bordeaux" },
      { name: "twitter:description", content: "Website for a handisport conference at ISG Bordeaux, featuring experts and para surf champion." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d582ed8b-a2bb-4a59-9894-bd69042d4c9b/id-preview-e305b45a--f17c6297-1697-44d4-a40f-1c3a04c342ee.lovable.app-1777011538200.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d582ed8b-a2bb-4a59-9894-bd69042d4c9b/id-preview-e305b45a--f17c6297-1697-44d4-a40f-1c3a04c342ee.lovable.app-1777011538200.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
