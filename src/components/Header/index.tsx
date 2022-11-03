import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { api } from "../../services/axios";
import {
  addUniversity,
  deleteUniversity,
  getUniversities,
} from "../../store/modules/table/actions";
import { Button } from "@mui/material";
import AddCircle from "@mui/icons-material/AddCircle";
import ChangeCircle from "@mui/icons-material/ChangeCircle";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import styles from "./styles.module.css";
import AlertDialog from "./AlertDialog";
import { IState } from "../../store";
import { IUniversity } from "../../store/modules/table/types";

export function Header() {
  const table = useSelector<IState, IUniversity[]>((state) => {
    return state.table.rows;
  });
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

  const theme = createTheme({
    components: {
      // Name of the component
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          disabled: {
            // Some CSS
            color: "white",
          },
        },
      },
    },
  });
  return (
    <header className={styles.header}>
      <h1>Universities in Australia</h1>
      <section>
        <LoadingButton
          loading={loading}
          variant="contained"
          startIcon={<ChangeCircle />}
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
        <ThemeProvider theme={theme}>
          <Button
            disabled={table.length == 0}
            startIcon={<AddCircle />}
            variant="contained"
            onClick={() => handleAddUniversity()}
          >
            Add
          </Button>
        </ThemeProvider>

        <AlertDialog disabled={(table.length == 0)}/>
      </section>
    </header>
  );
}
