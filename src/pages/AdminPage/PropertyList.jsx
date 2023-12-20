import {
  faEdit,
  faPlus,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import {
  useDeletePropertyMutation,
  useGetAllPropertiesQuery,
} from "../../features/Api";
import { baseUrl } from "../../features/constant";

const TABLE_HEAD = ["Products", "Price", "Created At", "Edit", "Delete"];

const PropertyList = () => {
  const [open, setOpen] = useState({});
  const { user } = useSelector((store) => store.user);
  const nav = useNavigate();
  const { data, isLoading, error } = useGetAllPropertiesQuery();
  const [deleteProperty, { isLoading: is_loading }] =
    useDeletePropertyMutation();

    const handleDelete = async (id) => {
        try {
          await deleteProperty({
            id: id,
            token: user.token,
          });
          toast.success("Successfully deleted");
        } catch (err) {
          toast.error(err.message);
        }
      };
  if (isLoading || is_loading) {
    return <Loading />;
  }

    const toggleOpen=(productId)=>{
      setOpen((prevState)=>({
        ...prevState,
        [productId]:!prevState[productId],
      }))
    }
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-5 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Product List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all products
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              onClick={() => nav("/property/add")}
              className="flex items-center gap-3"
              color="blue"
              size="sm"
            >
                AddProperty
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map(
                (
                  {
                    property_image,
                    property_name,
                    createdAt,
                    _id,
                    property_price,
                  },
                  index
                ) => {
                  return (
                    <tr key={_id}>
                      <td >
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={`${baseUrl}${property_image}`}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {property_name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td >
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            Rs.{property_price}
                          </Typography>
                        </div>
                      </td>

                      <td >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {createdAt}
                        </Typography>
                      </td>

                      <td >
                        <Tooltip content="Edit Product">
                          <IconButton
                            onClick={() => nav(`/property/edit/${_id}`)}
                            variant="text"
                            color="blue-gray"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </IconButton>
                        </Tooltip>
                      </td>

                      <td >
                        <Tooltip content="Remove Product">
                          <IconButton
                            onClick={() => toggleOpen(_id)}
                            variant="text"
                            color="red"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </IconButton>
                        </Tooltip>

                        <Dialog
                          open={open[_id]}
                          handler={() => toggleOpen(_id)}
                        >
                          <DialogHeader>Delete this product</DialogHeader>
                          <DialogBody divider>
                            Are you sure you want to delete this product?
                          </DialogBody>
                          <DialogFooter>
                            <Button
                              variant="text"
                              color="red"
                              onClick={() => toggleOpen(_id)}
                              className="mr-1"
                            >
                              <span>Cancel</span>
                            </Button>
                            <Button
                              variant="gradient"
                              color="green"
                              onClick={() => {
                                     handleDelete(_id);
                                toggleOpen(_id);
                              }}
                            >
                              <span>Confirm</span>
                            </Button>
                          </DialogFooter>
                        </Dialog>
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default PropertyList;
