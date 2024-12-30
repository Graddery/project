import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "YourContract" using the deployer account.
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("YourContract", {
    from: deployer,
    log: true,
    // Параметр args отсутствует, т.к. нет конструктора
    autoMine: true, // Ускорение процесса на локальных сетях
  });

  // Получение экземпляра контракта
  const yourContract = await hre.ethers.getContract<Contract>("YourContract");
  console.log("✅ Contract deployed at:", yourContract.address);

  // Удалите это, если метод greeting() отсутствует в контракте
  // console.log("👋 Initial greeting:", await yourContract.greeting());
};

export default deployYourContract;

// Теги для запуска конкретного скрипта деплоя
deployYourContract.tags = ["YourContract"];
