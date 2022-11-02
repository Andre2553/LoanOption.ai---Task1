import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { api } from "../../services/axios";
import {
  addUniversity,
  deleteUniversity,
  getUniversities,
} from "../../store/modules/table/actions";

import styles from "./styles.module.css";

export function Header() {
  const dispatch = useDispatch();

  const handleAddUniversity = useCallback(() => {
    dispatch(addUniversity());
  }, [dispatch]);

  const handleDeleteUniversity = useCallback(() => {
    dispatch(deleteUniversity());
  }, [dispatch]);

  const handleGetUniversity = useCallback(() => {
    api
      .get("search?country=Australia")
      .then((resp) => {
        dispatch(getUniversities(resp.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);
  return (
    <header className={styles.header}>
      <h1>Universities in Australia</h1>
      <section>
        <button onClick={()=> handleGetUniversity()}>Load</button>
        <button onClick={() => handleAddUniversity()}>Add</button>
        <button onClick={() => handleDeleteUniversity()}>Remove</button>
      </section>
    </header>
  );
}
