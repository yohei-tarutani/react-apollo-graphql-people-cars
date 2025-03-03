import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { GET_PEOPLE, REMOVE_PERSON } from "../../graphql/queries";
import filter from "lodash.filter";

const RemovePerson = ({ id }) => {
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });

      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: filter(people, (person) => {
            return person.id !== removePerson.id;
          }),
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this person?");
    if (result) {
      removePerson({
        variables: {
          id,
        },
      });
    }
  };

  return (
    <DeleteOutlined
      onClick={handleButtonClick}
      key="delete"
      style={{ color: "red" }}
    />
  );
};

export default RemovePerson;
