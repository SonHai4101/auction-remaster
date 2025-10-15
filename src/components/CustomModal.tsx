import { Dialog } from "./retroui/Dialog";
import { Button } from "./retroui/Button";
import { Text } from "./retroui/Text";

interface CustomModalProps {
  open: boolean;
  hide: () => void;
  show: () => void;
  children: React.ReactNode;
  size?: "auto" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "screen";
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  title?: string;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  open,
  hide,
  show,
  children,
  size = "auto",
  showCancelButton = true,
  showConfirmButton = true,
  showHeader = true,
  showFooter = true,
  title,
}) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        if (e) {
          show();
        } else {
          hide();
        }
      }}
    >
     
      <Dialog.Content size={size}>
        {showHeader && (
          <Dialog.Header position={"fixed"} asChild>
            <Text as="h5">{title || "123"}</Text>
          </Dialog.Header>
        )}
        {children}

        {showFooter && (
          <Dialog.Footer>
            {showConfirmButton && (
              <Dialog.Trigger asChild>
                <Button>Confirm</Button>
              </Dialog.Trigger>
            )}
            {showCancelButton && (
              <Dialog.Trigger asChild>
                <Button variant={"outline"}>Close</Button>
              </Dialog.Trigger>
            )}
          </Dialog.Footer>
        )}
      </Dialog.Content>
    </Dialog>
  );
};
