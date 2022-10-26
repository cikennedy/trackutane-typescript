import { useNavigation } from "@react-navigation/native";
import { Card, Icon } from "@rneui/themed";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import usePatientVisits from "../hooks/usePatientVisits";
import { PatientScreenNavigationProp } from "../screens/PatientsScreen";

type Props = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
};

const PatientCard = ({ email, firstName, lastName, userId }: Props) => {
  const tailwind = useTailwind();
  const { loading, error, visits } = usePatientVisits(userId);
  const navigation = useNavigation<PatientScreenNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("MyModal", { name: firstName, userId: userId })
      }
    >
      <Card containerStyle={[tailwind("p-5 rounded-lg"), { color: "gray" }]}>
        <View>
          <View style={tailwind("flex-row justify-between")}>
            <View>
              <Text style={tailwind("text-2xl font-bold")}>
                {lastName + "," + " " + firstName}
              </Text>
              <Text style={[tailwind("text-sm"), { color: "black" }]}>
                Phone:{" "}
              </Text>
              <Text>Email: {email}</Text>
            </View>

            <View style={tailwind("flex-row items-center justify-end")}>
              {/* put most recent visit here instead of amount of visits? Days since last visit? */}
              <Text style={{ color: "#59C1CC" }}>
                {loading ? "loading..." : `${visits.length} visits`}
              </Text>
              {/* patient image here? otherwise render icon */}
              <Icon
                style={tailwind("mb-5 ml-auto")}
                name="person"
                type="ionicon"
                color="#59C1CC"
                size={50}
              />
            </View>
          </View>
        </View>
        <Card.Divider />
        {/* include next visit date here */}
        <Text>Next Visit Date: </Text>
      </Card>
    </TouchableOpacity>
  );
};

export default PatientCard;
