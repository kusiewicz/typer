import { createFileRoute, useRouter } from "@tanstack/react-router";
import { getAllTeams, removeTeam } from "~/features/main/actions";
import { TeamForm } from "~/features/main/components/team-form";
import { createColumnHelper } from "@tanstack/react-table";
import { TeamFormProps } from "~/features/main/validators";
import { Table, COLUMN_SIZES } from "~/components/table";
import { Spacer } from "~/components/spacer";
import { Edit, Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Modal } from "~/components/modal";
import { useModal } from "~/hooks/use-modal";
import { ModalBody, ModalHeader } from "flowbite-react";

// TODO only admin should be able to do this
export const Route = createFileRoute("/_authed/add-team")({
  component: AddTeamPage,
  loader: async () => getAllTeams(),
});

function AddTeamPage() {
  const { data: teamsData } = Route.useLoaderData();
  const router = useRouter();

  const columnHelper = createColumnHelper<TeamFormProps>();

  const { mutate: removeTeamMutate, isPending } = useMutation({
    mutationFn: useServerFn(removeTeam),
    onSuccess: () => {
      // TODO add toast
      router.invalidate();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const columns = [
    columnHelper.accessor("name", {
      header: "Country",
      cell: (info) => <span>{info.getValue()}</span>,
      meta: {
        sizeClass: COLUMN_SIZES.grid6,
      },
    }),
    columnHelper.accessor("countryCode", {
      header: "Country code",
      cell: (info) => <span>{info.getValue()}</span>,
      meta: {
        sizeClass: COLUMN_SIZES.grid3,
      },
    }),
    columnHelper.display({
      id: "actions",
      cell: (info) => (
        <div className="flex gap-2 justify-center">
          <button
            className="p-2 text-blue-600 hover:text-blue-800"
            title="Edit"
            onClick={() => {
              console.log("Edit clicked");
            }}
          >
            <Edit className="w-5 h-5" />
          </button>
          {/* TODO Add popup */}
          <button
            className="p-2 text-red-600 hover:text-red-800"
            title="Delete"
            onClick={() =>
              removeTeamMutate({ data: { id: info.row.original.id } })
            }
            disabled={isPending}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ),
      meta: {},
    }),
  ];

  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <TeamForm />
      <Spacer />
      <div className="shadow-lg sm:rounded-lg w-[80%]">
        <Table data={teamsData} columns={columns} />
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <ModalHeader>Edit team</ModalHeader>
          <ModalBody>
            <TeamForm />
          </ModalBody>
        </Modal>
        <button onClick={openModal}>Open modal</button>
      </div>
    </>
  );
}
