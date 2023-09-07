import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    DateField,
    EmailField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps, useMany } from "@refinedev/core";

export const EmployeeList: React.FC<IResourceComponentsProps> = () => {
    const { dataGridProps } = useDataGrid();

    const { data: positionData, isLoading: positionIsLoading } = useMany({
        resource: "positions",
        ids: dataGridProps?.rows?.map((item: any) => item?.position_id) ?? [],
        queryOptions: {
            enabled: !!dataGridProps?.rows,
        },
    });

    const { data: teamData, isLoading: teamIsLoading } = useMany({
        resource: "teams",
        ids: dataGridProps?.rows?.map((item: any) => item?.team_id) ?? [],
        queryOptions: {
            enabled: !!dataGridProps?.rows,
        },
    });
    console.log(positionData)

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: "Id",
                type: "number",
                minWidth: 50,
            },
            {
                field: "created_at",
                flex: 1,
                headerName: "Created At",
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "employee_firstname",
                flex: 1,
                headerName: "Employee Firstname",
                minWidth: 200,
            },
            {
                field: "employee_lastname",
                flex: 1,
                headerName: "Employee Lastname",
                minWidth: 200,
            },
            {
                field: "position_id",
                flex: 1,
                headerName: "Position",
                valueGetter: ({row}) => row?.position_id,
                minWidth: 300,
                renderCell: function render({value}){
                    return positionIsLoading ? (
                        <>Loading...</>
                    ) : (
                        positionData?.data?.find((item) => item.id === value)?.position_name
                    )
                }
            },
            {
                field: "email",
                flex: 1,
                headerName: "Email",
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <EmailField value={value} />;
                },
            },
            {
                field: "phone_number",
                flex: 1,
                headerName: "Phone Number",
                type: "number",
                minWidth: 200,
            },
            {
                field: "team_id",
                flex: 1,
                headerName: "Team",
                minWidth: 300,
            },
            {
                field: "actions",
                headerName: "Actions",
                sortable: false,
                renderCell: function render({ row }) {
                    return (
                        <>
                            <DeleteButton hideText recordItemId={row.id} />
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        [positionData?.data, teamData?.data],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
