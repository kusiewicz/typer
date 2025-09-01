// TODO to do refaktoru - nie patrz

import { getRouteApi, useRouter } from "@tanstack/react-router";
import { AddTeamForm } from "~/features/add-team";
import { createColumnHelper } from "@tanstack/react-table";
import { Table, COLUMN_SIZES } from "~/shared/ui/table";
import { Spacer } from "~/shared/ui/spacer";
import { Edit, Trash2 } from "lucide-react";
import { Modal } from "~/shared/ui/modal";
import { useModal } from "~/shared/hooks/use-modal";
import { ModalBody, ModalHeader } from "flowbite-react";
import { EditTeamForm } from "~/features/edit-team";
import { TeamFormProps } from "~/entities/team/model/schema";
import { useDeleteTeam } from "~/features/delete-team";

export const TeamsPage = () => {
  const router = useRouter();
  const routeApi = getRouteApi("/_authed/teams");
  const { data: teamsData } = routeApi.useLoaderData();

  const columnHelper = createColumnHelper<TeamFormProps>();

  const { mutate: removeTeamMutate, isPending } = useDeleteTeam();

  const handleDeleteTeam = (id: string) => {
    removeTeamMutate(
      { data: { id } },
      {
        onSuccess: () => {
          // TODO add toast
          router.invalidate();
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

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
              onClick={() => handleDeleteTeam(info.row.original.id)}
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
};
