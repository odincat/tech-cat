import { CButton } from "@components/ui/Button";
import { Message, useModal } from "@components/ui/Modal";
import { trpc } from "@lib/trpc";
import { NextComponent } from "@lib/types";
import { createDictionary, useTranslation } from "@locales/utils";

const dict = createDictionary({
    warning: {
        de: "Drücke auf diesen Knopf um dein Konto endgültig zu löschen",
        en: "Press this button to delete your account",
    },
    button: {
        de: "Löschen!",
        en: "Delete!"
    },
    modal: {
        title: {
            de: "Willst du das wirklich tun?",
            en: "Are you sure you want to do this?"
        },
        description: {
            de: "All deine Posts, Kommentare und Kurzlinks werden unwiederuflich gelöscht. ALLE!",
            en: "All of your posts, comments and shortlinks will be deleted. All of them!"
        }
    }
});

export const DeleteAccount: NextComponent = () => {
    const deleteAccountMutation = trpc.auth.deleteAccount.useMutation();
    const confirmationModal = useModal();
    const { ts } = useTranslation();

    return (
        <div>
            <b className="text-red-400 mr-2">{ts(dict.warning)}</b>
            <CButton color="red" onClick={confirmationModal.show}>{ts(dict.button)}</CButton>
            <confirmationModal.Render>
                <Message title={ts(dict.modal.title)} description={ts(dict.modal.description)}>

                </Message>
            </confirmationModal.Render>
        </div>
    );
}
