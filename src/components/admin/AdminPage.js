import PropTypes from "prop-types";
import Heading from "../layout/Heading";

export default function AdminPage({ children }) {
  return (
    <>
      <Heading content="Admin" />
    </>
  );
}

AdminPage.propTypes = {
  children: PropTypes.node
};
