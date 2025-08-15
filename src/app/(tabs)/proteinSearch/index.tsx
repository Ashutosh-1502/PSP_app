import React, { useState } from "react";
import { View, Button, StyleSheet, Text, Alert } from "react-native";
import { WebView } from "react-native-webview";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

interface ProteinViewerProps {}

const ProteinViewer: React.FC<ProteinViewerProps> = () => {
  const [pdbContent, setPdbContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickPdbFile = async () => {
    try {
      setLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: ["*/*"],
        copyToCacheDirectory: true,
      });

      if (
        result.canceled === false &&
        result.assets &&
        result.assets.length > 0
      ) {
        const fileUri = result.assets[0].uri;
        const content = await FileSystem.readAsStringAsync(fileUri);

        console.log(`Loaded PDB file: ${content.length} characters`);
        setPdbContent(content);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load PDB file");
      console.error("File loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Convert PDB content to base64 for embedding in HTML
  const getPdbBase64 = () => {
    if (!pdbContent) return "";
    return btoa(pdbContent); 
  };

  // Create HTML with NGL Viewer
  const create3DMolViewerHTML = () => {
    const pdbData = getPdbBase64();

    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Protein Viewer</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: Arial, sans-serif;
        background: #000;
        overflow: hidden;
      }
      
      #container {
        width: 100vw;
        height: 100vh;
        background: #000;
        position: relative;
      }
      
      .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 18px;
        z-index: 1000;
      }
      
      .controls {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 1000;
        background: rgba(0, 0, 0, 0.8);
        padding: 12px;
        border-radius: 8px;
        min-width: 120px;
      }
      
      .controls button {
        background: #007AFF;
        color: white;
        border: none;
        padding: 12px 16px;
        margin: 3px 0;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        display: block;
        width: 100%;
        font-weight: 500;
      }
      
      .controls button:hover {
        background: #0056b3;
      }
      
      .controls button.active {
        background: #28a745;
      }
      
      .info {
        position: absolute;
        bottom: 10px;
        left: 10px;
        color: rgba(255, 255, 255, 0.7);
        font-size: 12px;
        z-index: 1000;
      }
    </style>
    <!-- Load 3Dmol.js and jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://3Dmol.csb.pitt.edu/build/3Dmol-min.js"></script>
  </head>
  <body>
    <div id="loading" class="loading">Loading protein structure...</div>
    
    <div class="controls">
      <button id="cartoon-btn" onclick="showCartoon()">Cartoon</button>
      <button id="ribbon-btn" onclick="showRibbon()">Ribbon</button>
      <button id="stick-btn" onclick="showStick()">Stick</button>
      <button id="sphere-btn" onclick="showSphere()">Ball & Stick</button>
      <button onclick="resetView()">Reset View</button>
    </div>
    
    <div class="info">
      Touch: Rotate | Pinch: Zoom | Double-tap: Center
    </div>
    
    <div id="container"></div>
    
    <script>
      let viewer;
      let currentModel;
      
      function setActiveButton(activeId) {
        const buttons = ['cartoon-btn', 'ribbon-btn', 'tube-btn', 'stick-btn', 'sphere-btn'];
        buttons.forEach(id => {
          const btn = document.getElementById(id);
          if (btn) {
            btn.classList.remove('active');
          }
        });
        const activeBtn = document.getElementById(activeId);
        if (activeBtn) {
          activeBtn.classList.add('active');
        }
      }
      
      $(document).ready(function() {
        viewer = $3Dmol.createViewer("container", {
          backgroundColor: "black"
        });
        
        const pdbData = "${pdbData}";
        
        if (pdbData) {
          try {
            // Decode base64 PDB data
            const decodedPdb = atob(pdbData);
            console.log("PDB data loaded, length:", decodedPdb.length);
            
            currentModel = viewer.addModel(decodedPdb, "pdb");
            console.log("Model added to viewer");
            
            viewer.setStyle({}, {
              cartoon: {
                color: 'spectrum', 
                thickness: 0.4
              }
            });
            
            setActiveButton('cartoon-btn');
            
            viewer.zoomTo();
            viewer.render();
            
            document.getElementById("loading").style.display = "none";
            
            console.log("3Dmol.js cartoon representation loaded successfully!");
            
          } catch (error) {
            console.error("Error loading protein:", error);
            document.getElementById("loading").innerHTML = "Error loading protein: " + error.message;
          }
        } else {
          document.getElementById("loading").innerHTML = "No PDB data provided";
        }
      });
      
      function showCartoon() {
        if (viewer && currentModel) {
          viewer.setStyle({}, {
            cartoon: {
              color: 'spectrum',
              thickness: 0.4
            }
          });
          viewer.render();
          setActiveButton('cartoon-btn');
          console.log("Switched to cartoon representation");
        }
      }
      
      function showRibbon() {
        if (viewer && currentModel) {
          viewer.setStyle({}, {
            cartoon: {
              color: 'spectrum',
              style: 'trace',
              thickness: 0.6
            }
          });
          viewer.render();
          setActiveButton('ribbon-btn');
          console.log("Switched to ribbon representation");
        }
      }
      
      function showStick() {
        if (viewer && currentModel) {
          viewer.setStyle({}, {
            stick: {
              colorscheme: 'Jmol',
              radius: 0.15
            }
          });
          viewer.render();
          setActiveButton('stick-btn');
          console.log("Switched to stick representation");
        }
      }
      
      function showSphere() {
        if (viewer && currentModel) {
          viewer.setStyle({}, {
            sphere: {
              colorscheme: 'Jmol',
              scale: 0.3
            }
          });
          viewer.render();
          setActiveButton('sphere-btn');
          console.log("Switched to sphere representation");
        }
      }
      
      function resetView() {
        if (viewer) {
          viewer.zoomTo();
          viewer.render();
          console.log("View reset");
        }
      }
      
      // Touch and interaction handling for mobile
      viewer.enableFog(true);
      viewer.setFogNear(50);
      viewer.setFogFar(100);
      
    </script>
  </body>
  </html>`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Protein Structure Viewer</Text>
        <Button
          title={loading ? "Loading..." : "Upload PDB File"}
          onPress={pickPdbFile}
          disabled={loading}
        />
      </View>

      <View style={styles.viewerContainer}>
        {pdbContent ? (
          <WebView
            source={{ html: create3DMolViewerHTML() }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onError={(error) => {
              console.error("WebView error:", error);
              Alert.alert("Error", "Failed to load protein viewer");
            }}
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              Please upload a PDB file to view the protein structure
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default function ProteinSearchScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ProteinViewer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingBottom: 90
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  viewerContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  placeholderText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
