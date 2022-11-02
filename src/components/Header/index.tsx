import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { api } from "../../services/axios";
import {
  addUniversity,
  deleteUniversity,
  getUniversities,
} from "../../store/modules/table/actions";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles.module.css";
import AlertDialog from "./AlertDialog";

export function Header() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleAddUniversity = useCallback(() => {
    dispatch(addUniversity());
  }, [dispatch]);

  const handleDeleteUniversity = useCallback(() => {
    dispatch(deleteUniversity());
  }, [dispatch]);

  const handleGetUniversity = useCallback(() => {
    setLoading(true);
    api
      .get("search?country=Australia")
      .then((resp) => {
        dispatch(getUniversities(resp.data));
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return (
    <header className={styles.header}>
      <h1>Universities in Australia</h1>
      <section>
        <LoadingButton
          loading={loading}
          variant="contained"
          color="secondary"
          onClick={() => handleGetUniversity()}
          sx={{
            " .MuiLoadingButton-loadingIndicatorCenter": {
              color: "white",
            },
          }}
        >
          Load
        </LoadingButton>
        <Button variant="contained" onClick={() => handleAddUniversity()}>
          Add
        </Button>
          <AlertDialog/>
      </section>
    </header>
  );
}
