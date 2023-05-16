import React, { useState } from "react";
import { DialogModal } from "components";

function DialogModalTester() {
  const [isOpened, setIsOpened] = useState(true);

  const onProceed = () => {
    console.log("Proceed clicked");
  };

  const styles = {
    button: {
      cursor: "pointer",
    },
  };

  return (
    <div>
      <button style={styles.button} onClick={() => setIsOpened(true)}>
        Open "dialog" modal
      </button>
      <DialogModal
        title="Dialog modal example"
        isOpened={isOpened}
        onProceed={onProceed}
        onClose={() => setIsOpened(false)}
      >
        <p>To close: click Close, press Escape, or click outside.</p>
      </DialogModal>
    </div>
  );
}

export default DialogModalTester;
