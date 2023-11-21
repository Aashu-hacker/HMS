import React, { useEffect } from "react";
import {
    Container,
    Grid,
} from "@material-ui/core";
import styles from "../../components/Global.module.css";

const DocumentUpload = () => {
    const handleEditSubmit = (e) => {
        e.preventDefault();

    };

    useEffect(() => {
    }, []);

    return (
        <Container maxWidth="xl">
            <form onSubmit={handleEditSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <div style={{ border: "0.5px solid grey", padding: "5px", borderRadius: "2px" }}>
                            <label for="profile-image">Upload Adhar Card</label>
                            <input type="file" id="profile-image" accept="image/*" style={{ padding: "12px" }} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ border: "0.5px solid grey", padding: "5px", borderRadius: "2px" }}>
                            <label for="profile-image">Upload PAN Card</label>
                            <input type="file" id="profile-image" accept="image/*" style={{ padding: "12px" }} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ border: "0.5px solid grey", padding: "5px", borderRadius: "2px" }}>
                            <label for="profile-image">Upload Passport</label>
                            <input type="file" id="profile-image" accept="image/*" style={{ padding: "12px" }} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ border: "0.5px solid grey", padding: "5px", borderRadius: "2px" }}>
                            <label for="profile-image">Upload Bank Passbook</label>
                            <input type="file" id="profile-image" accept="image/*" style={{ padding: "12px" }} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ border: "0.5px solid grey", padding: "5px", borderRadius: "2px" }}>
                            <label for="profile-image">Upload Photo</label>
                            <input type="file" id="profile-image" accept="image/*" style={{ padding: "12px" }} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ border: "0.5px solid grey", padding: "5px", borderRadius: "2px" }}>
                            <label for="profile-image">Joining Letter</label>
                            <input type="file" id="profile-image" accept="image/*" style={{ padding: "12px" }} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ border: "0.5px solid grey", padding: "5px", borderRadius: "2px" }}>
                            <label for="profile-image">Revealing Letter</label>
                            <input type="file" id="profile-image" accept="image/*" style={{ padding: "12px" }} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ border: "0.5px solid grey", padding: "5px", borderRadius: "2px" }}>
                            <label for="profile-image">Upload 10th Marksheet</label>
                            <input type="file" id="profile-image" accept="image/*" style={{ padding: "12px" }} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ border: "0.5px solid grey", padding: "5px", borderRadius: "2px" }}>
                            <label for="profile-image">Upload 12th Marksheet</label>
                            <input type="file" id="profile-image" accept="image/*" style={{ padding: "12px" }} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ border: "0.5px solid grey", padding: "5px", borderRadius: "2px" }}>
                            <label for="profile-image">Upload Graduation Marksheet</label>
                            <input type="file" id="profile-image" accept="image/*" style={{ padding: "12px" }} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ border: "0.5px solid grey", padding: "5px", borderRadius: "2px" }}>
                            <label for="profile-image">Upload Post Graduation Marksheet</label>
                            <input type="file" id="profile-image" accept="image/*" style={{ padding: "12px" }} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ border: "0.1px solid grey", padding: "5px", borderRadius: "2px" }}>
                            <label for="profile-image">Upload PHD Marksheet</label>
                            <input type="file" id="profile-image" accept="image/*" style={{ padding: "12px" }} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ border: "0.1px solid grey", padding: "5px", borderRadius: "2px" }}>
                            <label for="profile-image">Upload Others Document</label>
                            <input type="file" id="profile-image" accept="image/*" style={{ padding: "12px" }} />
                        </div>
                    </Grid>
                </Grid>
                <div style={{ float: "right", marginTop: "1rem" }}>
                    <button
                        className={styles.global_btn}
                        type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </Container>
    );
};
export default DocumentUpload;