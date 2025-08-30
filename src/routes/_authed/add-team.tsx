import { createFileRoute, useRouter } from "@tanstack/react-router";
import { getAllTeams, removeTeam } from "~/features/main/team-form/actions";
import { AddTeamForm } from "~/features/main/team-form/form/add-team-form";
import { createColumnHelper } from "@tanstack/react-table";
import { Table, COLUMN_SIZES } from "~/components/table";
import { Spacer } from "~/shared/ui/spacer";
import { Edit, Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Modal } from "~/components/modal";
import { useModal } from "~/hooks/use-modal";
import { ModalBody, ModalHeader } from "flowbite-react";
import { TeamFormProps } from "~/features/main/team-form/types";
import { EditTeamForm } from "~/features/main/team-form/form/edit-team-form";

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
      cell: (info) => {
        const { isOpen, openModal, closeModal } = useModal();

        return (
          <div className="flex gap-2 justify-center">
            <button
              className="p-2 text-blue-600 hover:text-blue-800"
              title="Edit"
              onClick={() => {
                openModal();
              }}
            >
              <Edit className="w-5 h-5" />
            </button>
            <Modal isOpen={isOpen} closeModal={closeModal}>
              <ModalHeader>Edit team</ModalHeader>
              <ModalBody>
                <EditTeamForm
                  id={info.row.original.id}
                  name={info.row.original.name}
                  countryCode={info.row.original.countryCode}
                />
              </ModalBody>
            </Modal>

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
        );
      },
      meta: {},
    }),
  ];

  return (
    <>
      <AddTeamForm />
      <Spacer />
      <div className="shadow-lg sm:rounded-lg w-[80%]">
        <Table data={teamsData} columns={columns} />
      </div>
    </>
  );
}
