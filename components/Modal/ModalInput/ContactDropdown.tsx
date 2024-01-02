import { useState, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import DropdownIcon from "@/assets/icons/arrow-drop-down.svg";
import CheckIcon from "@/assets/icons/check.svg";
import { Z_INDEX } from "@/styles/ZindexStyles";
import { useAtom } from "jotai";
import { cardAssigneeIdAtom } from "@/states/atoms";
import { Member } from "@/api/members/members.types";
import { getMembers } from "@/api/members";

interface ContactDropdownProps {
  dashboardId: number;
  assigneeNickname?: string | null;
  assigneeProfileImageUrl?: string | null;
  onSelectMember?: (userId: number) => void;
}

const ContactDropdown = ({ dashboardId, assigneeNickname, assigneeProfileImageUrl, onSelectMember }: ContactDropdownProps) => {
  const [membersData, setMembersData] = useState<Member[]>([]);
  const [filter, setFilter] = useState("");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showList, setShowList] = useState(false);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const memberData = await getMembers({ dashboardId, token });
        if (memberData) {
          setMembersData(memberData.members);

          if (assigneeNickname) {
            const assignee = memberData.members.find((member) => member.nickname === assigneeNickname);
            if (assignee) {
              setSelectedMember(assignee);
              setFilter(assigneeNickname); // 여기서 필터 상태를 업데이트
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch members", error);
      }
    };

    fetchMembers();
  }, [dashboardId, token]);

  const [, setAssigneeId] = useAtom(cardAssigneeIdAtom);
  const toggleList = () => {
    setShowList(!showList);
    if (!showList) {
      setFilteredMembers(membersData);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setFilter(input);
    const matchedMembers = membersData.filter((membersData) => membersData.nickname.toLowerCase().includes(input.toLowerCase()));

    setFilteredMembers(matchedMembers);

    if (input) {
      setShowList(true);
    } else {
      setSelectedMember(null);
      setShowList(false);
    }
  };

  const handleSelect = (membersData: Member) => {
    setSelectedMember(membersData);
    setFilter(membersData.nickname);
    setShowList(false);
    if (onSelectMember) onSelectMember(membersData.userId);
    setAssigneeId(membersData.userId);
  };

  return (
    <>
      <Text>담당자</Text>
      <Container>
        <InputContainer>
          {selectedMember && <SelectProfileIcon src={selectedMember.profileImageUrl} alt="Profile" />}
          <Input
            type="text"
            value={filter}
            onChange={handleChange}
            placeholder="이름을 입력해 주세요"
            style={{
              paddingLeft: selectedMember ? "4.5rem" : "1.6rem",
            }}
          />
          <ArrowDownIcon onClick={toggleList} style={{ pointerEvents: "auto" }} />
        </InputContainer>

        {showList && (
          <List>
            {filteredMembers.map((membersData) => (
              <ListItem key={membersData.id} onClick={() => handleSelect(membersData)}>
                <ProfileIcon src={membersData.profileImageUrl} alt="Profile" />
                {membersData.nickname}
                <CheckIconStyled />
              </ListItem>
            ))}
          </List>
        )}
      </Container>
    </>
  );
};

export default ContactDropdown;

const Text = styled.h3`
  margin-bottom: -2.2rem;

  color: var(--Black33);
  font-size: 1.8rem;
  font-weight: 500;
`;

const Container = styled.div`
  width: 21.7rem;
  height: 4.8rem;

  position: relative;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  position: relative;
`;

const SelectProfileIcon = styled.img`
  width: 2.4rem;
  height: 2.4rem;

  position: absolute;
  left: 1.6rem;
  top: 50%;

  border-radius: 50%;

  transform: translateY(-50%);
  object-fit: cover;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;

  padding: 1.4rem 1.6rem;

  display: flex;
  align-items: center;
  gap: 1rem;

  border-radius: 6px;
  border: 1px solid var(--Grayd9);
  background: var(--White);

  font-size: 1.6rem;

  &:focus {
    border: 1.4px solid var(--Main);
    outline: none;
  }
`;

const ArrowDownIcon = styled(DropdownIcon)`
  position: absolute;
  top: 50%;
  right: 1.6rem;

  transform: translateY(-50%);
  pointer-events: none;
`;

const List = styled.ul`
  color: var(--Black33);
  font-size: 1.4rem;
  font-weight: 400;

  border-radius: 6px;
  border: 1px solid var(--Grayd9);
  background: var(--White);
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08);

  position: relative;
  z-index: ${Z_INDEX.ContactDropdown_List};
`;

const ListItem = styled.li`
  height: 4.5rem;

  padding: 0.5rem 1rem;

  display: flex;
  align-items: center;
  position: relative;

  cursor: pointer;

  &:hover {
    background: var(--Grayfa);
  }
`;

const ProfileIcon = styled.img`
  width: 2.4rem;
  height: 2.4rem;

  margin-right: 1rem;

  border-radius: 50%;

  object-fit: cover;
`;

const CheckIconStyled = styled(CheckIcon)`
  display: none;

  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);

  color: var(--Gray78);

  ${ListItem}:hover & {
    display: block;
  }
`;
