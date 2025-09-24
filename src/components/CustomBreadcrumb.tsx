import { Breadcrumb } from "./retroui/Breadcrumb";
import { Slash } from "lucide-react";
import { Link, useLocation } from "react-router";

interface CustomBreadcrumbProps {
  startFrom?: string;
}

export const CustomBreadcrumb = ({ startFrom }: CustomBreadcrumbProps) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const startIndex = startFrom ? pathnames.indexOf(startFrom) : 0;
  const visibleSegments =
    startIndex >= 0 ? pathnames.slice(startIndex) : pathnames;
  return (
    <>
      <Breadcrumb className="">
        <Breadcrumb.List>
          {visibleSegments.map((segment, index) => {
            const to =
              "/" +
              pathnames
                .slice(0, (startFrom ? startIndex : 0) + index + 1)
                .join("/");
            const isLast = index === visibleSegments.length - 1;
            return (
              <div key={to} className="flex items-center gap-2">
                <Breadcrumb.Item>
                  {isLast ? (
                    <Breadcrumb.Page>
                      {segment.replace(/-/g, " ")}
                    </Breadcrumb.Page>
                  ) : (
                    <Breadcrumb.Link asChild>
                      <Link to={to}>{segment.replace(/-/g, " ")}</Link>
                    </Breadcrumb.Link>
                  )}
                </Breadcrumb.Item>

                {!isLast && (
                  <Breadcrumb.Separator>
                    <Slash />
                  </Breadcrumb.Separator>
                )}
              </div>
            );
          })}
        </Breadcrumb.List>
      </Breadcrumb>
    </>
  );
};
