// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract YourContract {
    // Структура для хранения данных о дипломе
    struct Diploma {
        string institution;
        string degree;
        string major;
        uint256 graduationYear;
    }

    // Маппинг от адреса владельца к массиву его дипломов
    mapping(address => Diploma[]) private diplomas;

    // Событие для логирования добавления диплома
    event DiplomaAdded(
        address indexed owner,
        string institution,
        string degree,
        string major,
        uint256 graduationYear
    );

    // Функция для добавления диплома
    function addDiploma(
        string memory _institution,
        string memory _degree,
        string memory _major,
        uint256 _graduationYear
    ) public {
        // Создаем новый диплом и добавляем его в массив дипломов отправителя
        diplomas[msg.sender].push(Diploma({
            institution: _institution,
            degree: _degree,
            major: _major,
            graduationYear: _graduationYear
        }));

        // Генерируем событие
        emit DiplomaAdded(msg.sender, _institution, _degree, _major, _graduationYear);
    }

    // Функция для получения дипломов пользователя
    function getDiplomas(address _owner) public view returns (Diploma[] memory) {
        return diplomas[_owner];
    }

    // Функция для проверки наличия диплома по ключевым данным
    function hasDiploma(
        address _owner,
        string memory _institution,
        string memory _degree,
        string memory _major,
        uint256 _graduationYear
    ) public view returns (bool) {
        Diploma[] memory userDiplomas = diplomas[_owner];

        for (uint256 i = 0; i < userDiplomas.length; i++) {
            Diploma memory diploma = userDiplomas[i];
            if (
                keccak256(abi.encodePacked(diploma.institution)) == keccak256(abi.encodePacked(_institution)) &&
                keccak256(abi.encodePacked(diploma.degree)) == keccak256(abi.encodePacked(_degree)) &&
                keccak256(abi.encodePacked(diploma.major)) == keccak256(abi.encodePacked(_major)) &&
                diploma.graduationYear == _graduationYear
            ) {
                return true;
            }
        }

        return false;
    }
}
